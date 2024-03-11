function Node(data,nextNode=null,prevNode=null) {
    return {data,prevNode,nextNode};
}

function LinkedList() {
    let list = null;

    const getTopOfList = () => {
        while (list.prevNode !== null) {
            list = list.prevNode;
        }
    };

    const getBottomOfList = () => {
        while (list.nextNode !== null) {
            list = list.nextNode;
        }
    };

    const append = (data) => {
        if (list === null) {
            list = Node(data);
            return;
        }
        list.nextNode = Node(data);
        list.nextNode.prevNode = list;
        list = list.nextNode;
    };

    const prepend = (data) => {
        if (list === null) {
            list = Node(data);
            return;
        }
        getTopOfList();
        list.prevNode = Node(data);
        list.prevNode.nextNode = list;
        getBottomOfList();
    };

    const size = () => {
        if (list === null) {
            return 0;
        }
        let listCopy = list;
        let items = 1;
        while (listCopy.prevNode !== null) {
            listCopy = listCopy.prevNode;
            items++;
        }
        return items;
    };

    const head = () => {
        let listCopy = list;
        while (listCopy.prevNode !== null) {
            listCopy = listCopy.prevNode;
        }
       return listCopy;
    };

    const tail = () => {
        return list;
    };
    
    const at = (index) => {
        const listSize = size();
        getTopOfList();

        let indexingList = list;

        if (index >= listSize || index < 0) {
            return "Does not exist";
        }
        for (let i = 1; i <= index; i++) {
            indexingList = indexingList.nextNode;
        }
        getBottomOfList();
        return indexingList;
    };

    const pop = () => {
        if (size() === 1 || list === null) {
            list = null;
            return;
        }
        list = list.prevNode;
        list.nextNode = null;
    };
    
    const contains = (data) => {
        let listCopy = list;
        while (listCopy !== null) {
            if (listCopy.data === data) {
                return true;
            }
            listCopy = listCopy.prevNode;
        }

        return false;
    };

    const find = (data) => {
        getTopOfList();
        let listCopy = list;
        getBottomOfList();

        let index = 0;

        while (listCopy !== null) {
            if (listCopy.data === data) {
                return index;
            }
            index++;
            listCopy = listCopy.nextNode;
        }
        
        return null;
    };

    const insertAt = (value, index) => {
        const listSize = size();
        getTopOfList();

        if (index >= listSize) {
            getBottomOfList();
            append(value);
            return;
        }
        if (index < 0) {
            getBottomOfList();
            return "Negative Numbers Not Allowed";
        }
       
        let i = 0;
        while (list !== null) {
            if (i !== index) {
                list = list.nextNode;
                i++;
                continue;
            }

            oldPrev = list.prevNode;
            oldNext = list;
            
            list = Node(value);
            
            list.prevNode = oldPrev;
            list.nextNode = oldNext;
            if (list.nextNode !== null) {
                list.nextNode.prevNode = list;
            }
            if (list.prevNode !== null) {
                list.prevNode.nextNode = list;
            }
            
            break;
        }
        
        while (list.nextNode !== null) {
            list = list.nextNode;
        }
        
    };

    const removeAt = (index) => {
        const listSize = size();
        getTopOfList();

        if (index >= listSize) {
            getBottomOfList();
            return "Index too Big";
        }
        if (index < 0) {
            getBottomOfList();
            return "Negative Numbers Not Allowed";
        }
       
        let i = 0;
        while (list !== null) {
            if (i !== index) {
                list = list.nextNode;
                i++;
                continue;
            }
            
            
            if (list.nextNode !== null) {
                list.nextNode.prevNode = list.prevNode;
            }
            if (list.prevNode !== null) {
                list.prevNode.nextNode = list.nextNode;
            }
            break;
        }
        if (index === listSize-1) {
            list = list.prevNode;
        }
        while (list.nextNode !== null) {
            list = list.nextNode;
        }
        
    };

    const toString = () => {
        if (list === null) {
            return "No Data in List";
        }
        let currentList = list;
        let stringToPrint = ``;
        let itemsInList = [];
        
        while (currentList !== null) {
            itemsInList.push(currentList.data);
            currentList = currentList.prevNode;
        }
        for (let i = itemsInList.length-1; i > -1; i--) {
            if (i === 0) {
                stringToPrint += `(${itemsInList[i]})`;
                break;
            }
            stringToPrint += `(${itemsInList[i]}) -> `;
        }
        return stringToPrint;

    };


    return {append,prepend,size,head,tail,at,pop,contains,find,insertAt,removeAt,toString};
}
