import List from './models/List';
import ListTemplate from './templateses/ListTemplate';
import ListItem from './models/ListItem';

const initApp = (): void => {
    console.log('init!');
    const listInstance = List.instance;
    const listTemplateInstance = ListTemplate.instance;

    const itemForm = document.getElementById('form') as HTMLFormElement;

    itemForm.addEventListener('submit', (event: SubmitEvent): void => {
        event.preventDefault();

        // 새 item Text
        const inputEl = document.getElementById('item-input') as HTMLInputElement;
        const newText = inputEl.value.trim();
        if (!newText.length) return;
        inputEl.value = '';

        // 새 item ID
        const itemId: number = listInstance.list.length ? parseInt(listInstance.list[listInstance.list.length - 1].id) + 1 : 1;
        const itemChecked: boolean = false;

        // newItem 생성하기
        const newItem = new ListItem(itemId.toString(), newText, itemChecked);

        // list에 new item 넣기
        listInstance.addItem(newItem);

        listTemplateInstance.render(listInstance);

    })

    const clearItemEl = document.getElementById('clear-items-btn') as HTMLButtonElement;

    clearItemEl.addEventListener('click', () => {
        listInstance.clearList();
        listTemplateInstance.clear();
    })

    // 초기 데이터를 로드
    listInstance.load();

    // 생성된 데이터를 이용해서 화면에서 보여주기
    listTemplateInstance.render(listInstance);
}

initApp();