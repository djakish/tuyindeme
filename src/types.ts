export type Resume = {
    name: string,
    urls: { title: string }[],
    sections: Section[]
}

export type Section = {
    name: string,
    items: Item[]
}

export type Item = {
    title: string,
    rightTitle: string,
    subTitle: string,
    rightSubTitle: string,
    description: string,
}

export interface WorkerCommand {
    format: string;
    json: string;
    dark: boolean;
    template: Template;
}

export interface Template {
    style: string;
    white: string;
    dark: string;
}