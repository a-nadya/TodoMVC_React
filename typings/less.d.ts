declare module "*.less" {
    const styles: { [classname: string]: undefined | string };
    export = styles;
}
