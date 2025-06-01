var checkList: {element: Element, callback: Function}[] = [];

window.addEventListener('click', (e: any) => {
    checkList.forEach(obj => {
        if(!obj.element.contains(e.target)) {
            obj.callback();
        }
    })
});

export const addCheckList = (obj: {element: Element, callback: Function}) => checkList.push(obj);

export const removeFromCheckList = (element: Element) => {
    const objIndex = checkList.findIndex(obj => obj.element === element);
    objIndex && checkList.splice(objIndex, 1);
}