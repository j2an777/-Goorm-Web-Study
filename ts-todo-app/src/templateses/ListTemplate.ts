import List from '../models/List';

interface DOMList {
    ul: HTMLUListElement;
    clear(): void;
    render(fullList: List): void;
}

export default class ListTemplate implements DOMList {
    ul: HTMLUListElement;

    static instance: ListTemplate = new ListTemplate();

    private constructor() {
        this.ul = document.getElementById('list') as HTMLUListElement;
    }

    clear(): void {
        this.ul.innerHTML = '';
    }

    render(fullList: List): void {
        this.clear();

        fullList.list.forEach(item => {
            const liEl = document.createElement('li') as HTMLLIElement;
            liEl.className = 'item';

            const checkEl = document.createElement('input') as HTMLInputElement;
            checkEl.type = 'checkbox';
            checkEl.id = item.id;
            checkEl.checked = item.checked;
            liEl.append(checkEl);

            checkEl.addEventListener('change', () => {
                item.checked = !item.checked;
                fullList.save();
            })

            const labelEl = document.createElement('label') as HTMLLabelElement;
            labelEl.htmlFor = item.id;
            labelEl.textContent = item.item;
            liEl.append(labelEl);

            const buttonEl = document.createElement('button') as HTMLButtonElement;
            buttonEl.className = 'button';
            buttonEl.textContent = 'X';
            liEl.append(buttonEl);

            buttonEl.addEventListener('click', () => {
                fullList.removeItem(item.id);
                this.render(fullList);
            });
                   

            this.ul.append(liEl);
        })
    }
}