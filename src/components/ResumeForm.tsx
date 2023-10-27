import { For } from "solid-js";
import { Resume, Section } from "../types";
import ItemForm from "./ItemForm";

const ResumeForm = (props: { resume: Resume }) => {

    const addSection = () => {
        const section: Section = {
            name: "New Section",
            items: [],
        };
        props.resume.sections.push(section);
    }
    const deleteSection = (index: any) => {
        props.resume.sections.splice(index(), 1)
    }

    const deleteUrl = (index: any) => {
        props.resume.urls.splice(index, 1)
    }

    const addUrl = () => {
        props.resume.urls.push({ title: "" })
    }

    return (
        <div class="divide-y-4 divide-primary dark:divide-secondary w-full ">
            {/* Links */}
            <section class="pb-6">
                <section class="pb-4 pt-4 flex flex-row justify-between items-center px-4 ">
                    <input name="name" class="input-primary  w-full" value={props.resume.name} onInput={(e) => {
                        props.resume.name = e.target.value
                    }}></input>
                </section>
                <section class="pb-4 pt-4 flex flex-row justify-between items-center px-4">
                    <h1 class='heading-primary'>
                        LINKS
                    </h1>
                    <button class="btn-primary dark:btn-primary-dark" onClick={addUrl}>Add</button>
                </section>
                <section class="flex flex-col space-y-4 px-4 w-full">
                    <For each={props.resume.urls}>
                        {(item, index) => (
                            <section class="flex  w-full">
                                <input name="link" class='input-primary  w-full'
                                    placeholder='Some links?'
                                    value={item.title} onInput={(e) => {
                                        item.title = e.target.value
                                    }}
                                />
                                <button class="btn-primary dark:btn-primary-dark" onClick={() => deleteUrl(index())}>Delete</button>
                            </section>
                        )}
                    </For>
                </section>
            </section>
            {/* Sections Divider */}
            <section class="py-2 flex flex-row justify-between items-center px-4 bg-secondary dark:bg-primary">
                <h1 class='heading-primary'>
                    SECTIONS
                </h1>
                <button class="btn-primary dark:btn-primary-dark" onClick={addSection}>Add</button>
            </section>
            {/* Sections */}
            <section class="divide-solid divide-primary divide-dashed dark:divide-secondary divide-y-2 ">
                <For each={props.resume.sections} >
                    {(section, index) => (
                        <>
                            <div class="py-8 px-4">
                                <section class="flex pb-4 w-full items-center">
                                    <input name="section" class='input-primary w-full'
                                        placeholder='Section name'
                                        value={section.name} onInput={(e) => {
                                            section.name = e.target.value
                                        }}
                                    />
                                    <button class="btn-primary dark:btn-primary-dark" onClick={[deleteSection, index]}>Delete</button>
                                </section>
                                <ItemForm items={section.items} />
                            </div>
                        </>
                    )}
                </For>
            </section>

        </div>
    )
}


export default ResumeForm
