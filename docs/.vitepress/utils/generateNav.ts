import * as fs from 'fs';
import * as path from 'path';
import { fileOrDirNameMap, order } from '../../nav/meta.json';

interface NavItem0 {
    text: string;
    link: string;
}

interface NavItem1 {
    text: string;
    items: NavItem[];
}

type NavItem = NavItem0 | NavItem1;
type Stats = fs.Stats;

function generateNavItem(directoryPath: string): NavItem[] {
    const filesAndDirs: string[] = fs.readdirSync(directoryPath);
    const navItems: NavItem[] = [];

    filesAndDirs.forEach((fileOrDir: string) => {
        const fullPath: string = path.join(directoryPath, fileOrDir);
        const stat: Stats = fs.statSync(fullPath);

        if (stat.isFile() && fileOrDir.endsWith('.md')) {
            navItems.push({
                text: fileOrDir.replace('.md', ''),
                link: fullPath.replace('docs/', ''),
            });
        } else if (stat.isDirectory()) {
            const newPath = path.join(directoryPath, fileOrDir);
            navItems.push({
                text: fileOrDir,
                items: generateNavItem(newPath),
            });
        }
    });
    return navItems;
}

function mapFileOrDirName(navItem: NavItem[]): void {
    navItem.forEach((item) => {
        if (item.text in fileOrDirNameMap) {
            item.text = fileOrDirNameMap[item.text];
        }

        if ('items' in item) {
            mapFileOrDirName(item.items);
        }
    });
}

interface OrderItem {
    name: string;
    order: string[];
}
type OrderArray = (string | OrderItem)[];

function getOrder(item: string, orderArr: OrderArray): number {
    const DEFAULT_ORDER: number = orderArr.length;
    for (let i = 0; i < orderArr.length; i++) {
        const orderItem = orderArr[i];
        if (typeof orderItem === 'string') {
            if (item === orderItem) {
                return i;
            }
        } else if (orderItem.name === item) {
            return i;
        }
    }
    return DEFAULT_ORDER;
}

function isNavitem1(item: NavItem): boolean {
    return 'items' in item;
}

function sortNavItems(navItems: NavItem[], orderArr: OrderArray): void {
    navItems.sort((a: NavItem, b: NavItem) => {
        return getOrder(a.text, orderArr) - getOrder(b.text, orderArr);
    });
    for (let navItem of navItems) {
        if (isNavitem1(navItem)) {
            navItem = navItem as NavItem1;
            sortNavItems(navItem.items, orderArr);
        }
    }
}

export default function autoGenerateNavItems(navDirectoryPath: string): NavItem[] {
    const targetDirectory: string = path.join('docs', navDirectoryPath);

    const navItems: NavItem[] = generateNavItem(targetDirectory);

    sortNavItems(navItems, order); // Sort the nav items

    mapFileOrDirName(navItems); // Map file or dir names to their corresponding values
    return navItems;
}

autoGenerateNavItems('nav');
