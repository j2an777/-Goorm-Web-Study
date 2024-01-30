import { IListItem } from "./ListItem";
import ListItem from "./ListItem";
import storage from "../utils/storage";

interface IList {
    list: IListItem[];
    load(): void;
    save(): void;
    clearList(): void;
    addItem(itemObj: IListItem): void;
    removeItem(id: string): void;
}

export default class List implements IList {

    static instance = new List();

    // 타입스크립트 싱글톤 => private 선언, 클래스 내부에서만 가능
    private constructor(
        private _list: IListItem[] = [],
    ) {}

    get list(): IListItem[] {
        return this._list;
    }

    load(): void {

        const parsedList = storage.get<{
            _id: string,
            _item: string,
            _checked: boolean
        }[]>('myList');

        // listItem 인스턴스 객체 생성 => list 인스턴스 객체에 넣어주기
        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(
                itemObj._id,
                itemObj._item,
                itemObj._checked
            )

            List.instance.addItem(newListItem)
        })
    }

    // 로컬스토리지에 listItem저장
    save(): void {
        storage.set('myList', this._list);
    }

    // 리스트 초기화
    clearList(): void {
        this._list = [];
        this.save();
    }

    // listItem 추가
    addItem(itemObj: IListItem): void {
        this._list.push(itemObj);
        this.save();
    }

    // listItem 삭제
    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }
}