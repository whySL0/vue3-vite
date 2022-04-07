import { cloneDeep } from 'lodash'
Array.prototype.toTree = function (
    parentKey = 'parentId',
    childrenKey = 'children',
    rootId = -1,
  ) {
    let _this = cloneDeep(this)
    let arrayToTree = (data, parentId) => {
      //  arr 是返回的数据  parendId 父id
      let temp = [];
      let treeArr = data;
      treeArr.forEach((item, index) => {
        if (item[parentKey] === parentId) {
          let arrayToTree1 = arrayToTree(treeArr, treeArr[index].id);
          if (arrayToTree1.length > 0) {
            // 递归调用此函数
            treeArr[index][childrenKey] = arrayToTree1;
          }
          temp.push(treeArr[index]);
        }
      });
      return temp;
    }
  
    return arrayToTree(_this, rootId);
  }
  