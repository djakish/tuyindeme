import { For } from "solid-js";
import { Item } from "../types";

function ItemForm(props: { items: Item[] }) {
    const addItem = () => {
        const item: Item = {
            title: "",
            rightTitle: "",
            subTitle: "",
            rightSubTitle: "",
            description: ""
        };
        props.items.push(item);
    }

    const deleteItem = (index: any) => {
        props.items.splice(index(), 1)
    }

    return (
        <>
            <For each={props.items}>
                {(item, index) => (
                    <div class="flex flex-col justify-between space-y-4 mt-4">
                        <section class="flex space-x-4 w-full justify-between items-center">
                            <h1 class="heading-secondary">
                                {"#" + (index() + 1)}
                            </h1>
                            <button class="btn-primary" onClick={[deleteItem, index]}>Delete</button>

                        </section>

                        <section class="flex space-x-4 w-full items-center">
                            <input name="title" class='input-primary w-1/2'
                                placeholder='Item title'
                                value={item.title} onInput={(e) => {
                                    item.title = e.target.value
                                }}
                            />
                            <input name="right-title" class='input-primary  w-1/2'
                                placeholder='Right title'
                                value={item.rightTitle} onInput={(e) => {
                                    item.rightTitle = e.target.value
                                }}
                            />
                        </section>
                        <section class="flex space-x-4 w-full items-center">
                            <input name="sub-title" class='input-primary  w-1/2'
                                placeholder='Subtitle'
                                value={item.subTitle} onInput={(e) => {
                                    item.subTitle = e.target.value
                                }}
                            />
                            <input name="right-sub-title" class='input-primary  w-1/2'
                                placeholder='Right subtitle'
                                value={item.rightSubTitle} onInput={(e) => {
                                    item.rightSubTitle = e.target.value
                                }}
                            />
                        </section>
                        <textarea name="description" rows="4" class='py-2 px-4 bg-darkBg border-2 border-darkBorder text-darkText font-semibold focus:outline-none focus:bg-darkBgSecondary  placeholder-gray-400'
                            placeholder='Description'
                            value={item.description} onInput={(e) => {
                                item.description = e.target.value
                            }}
                        />
                    </div>
                )}
            </For>
            <section class="flex flex-row justify-end items-center pt-4">
                <button class="btn-primary" onClick={addItem}>Add Item</button>
            </section>
        </>
    )
}

export default ItemForm;