import * as fs from 'fs';
import * as path from 'path';
import { file_or_dir_name_map, order, exclude_files } from '../../nav/meta.json';


type NavItem = 
    | { text: string; link: string; items?: never }           
    | { text: string; link?: never; items: NavItem[] }; 

function generateNavItem(dir_path: string): NavItem[] {
    // 读取dir_pathx下的文件或目录, files_and_dirs 输出示例:
    // [about.md,assets,design-pattern,env-config,framework]
    // 其中about.md是文件其他都是目录
    const files_and_dir: string[] = fs.readdirSync(dir_path); // 阻塞式读取, 读取完成后才执行后面的代码
    const nav_items: NavItem[] = [];

    files_and_dir.forEach((file_or_dir: string) => {
        const fullPath: string = path.join(dir_path, file_or_dir);
        const stats: fs.Stats = fs.statSync(fullPath);

        // 如果是排除的文件, 则跳过
        if (exclude_files.includes(file_or_dir)) {
            return;
        }

        if (stats.isFile() && file_or_dir.endsWith('.md')) {
            const file_name = file_or_dir.replace('.md', '');
            nav_items.push(
                {
                    text: file_name,
                    link: fullPath.replace(/^docs[\\/]/, ''),
                }
            );
        } else if (stats.isDirectory()) {
            const new_path = path.join(dir_path, file_or_dir);
            nav_items.push(
                {
                    text: file_or_dir,
                    items: generateNavItem(new_path),
                }
            );
        }
    });
    return nav_items;
}

function mapNavItemsName(nav_items: NavItem[]): void {
    nav_items.forEach((item) => {
        if (item.text in file_or_dir_name_map) 
            item.text = file_or_dir_name_map[item.text];

        if (item.items) 
            mapNavItemsName(item.items);
    });
}

// 排序项类型, 可为字符串或包含名称和排序数组的对象
type SortItem = string | { name: string; order: string[] };

function getOrderIndex(item_name: string): number {
    for (let i = 0; i < order.length; i++) {
        const sort_item: SortItem = order[i];

        if (typeof sort_item === 'string') {
            if (item_name === sort_item) 
                return i;
        } else if (sort_item.name === item_name)
            return i;
    }

    return order.length; // 如果没有找到, 返回最大值, 使其排在最后
}

function sortNavItems(nav_items: NavItem[]): void {
    nav_items.sort((a: NavItem, b: NavItem) => {
        return getOrderIndex(a.text) - getOrderIndex(b.text);
    });

    for (let item of nav_items) {
        if (item.items) 
            sortNavItems(item.items);
    }
}

function autoGenerateNavItems(navDirectoryRootPath: string): NavItem[] { 
    navDirectoryRootPath = path.join('docs/', navDirectoryRootPath);
    const navItems: NavItem[] = generateNavItem(navDirectoryRootPath);

    // 排序必须在名称映射之前, 进行名称映射之后会丢失原有名称
    sortNavItems(navItems);
    mapNavItemsName(navItems); 

    // console.log(JSON.stringify(navItems, null, 2));
    return navItems;
}

export default autoGenerateNavItems;