declare module "*.less" {
    const styles: (
        ...args: Array<{ [classname: string]: boolean } | string>
    ) => string;
    export = styles;
}
