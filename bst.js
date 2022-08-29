class Node{
    constructor(data, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right; 
    }
}

class Tree{
    constructor(arr){
        this.arr = arr;
        this.root = this.buildTree(this.arr);
    }

    buildTree(newData){
        let arr = newData.sort((a,b) => a - b);
        arr = [...new Set(arr)]; 

        if(arr.length < 1 ) {
            return null
        }
        const midVal = Math.ceil((arr.length - 1) / 2); 
        const root = new Node(arr.splice(midVal, 1));

        root.left = this.buildTree(arr.splice(0, midVal));
        root.right = this.buildTree(arr.splice(-midVal)); 


        this.root = root; 
        return root
    }

    insert(value, root = this.root){

        if(!root){
            const node = new Node(value)
            return node
        }

        if(value > root.data) {
            root.right = this.insert(value,root.right)
        }

        if(value < root.data){
            root.left = this.insert(value, root.left)
        }

        return root
    } 

    delete(value, root = this.root){

        if(value != root.data) {
            if(value < root.data){
                root.left = this.delete(value, root.left)
            } else {
                root.right = this.delete(value, root.right)
            }
        } else {
            if(!root.left && !root.right){
                return null
            } else if (!root.left){
                return root.right;
            } else if (!root.right){
                return root.left;
            } else {
                if(!root.right.left){
                    root.right.left = root.left;
                    return root.right; 
                } else {
                    root.right.left.left = root.left;
                    root.right.left.right = root.right;
                    root = root.right.left; 
                    root.right.left = null;
                    return root
                }

            }


        }


        

       return root
    }




    find(value, root = this.root){

        if(!root){
            return "Not found!"
        }

        if(value != root.data){
            if(value < root.data){
               return this.find(value, root.left)
            }
            else {
               return this.find(value, root.right)
            }
        } 
        
        return root

    }

    levelOrder(callback){

      const queue = [this.root]; 

      const list = [];

      while (queue.length > 0) {
        const node = queue.shift();
        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
        if (callback) callback(node);
        else list.push(node.data);
      }

      if (!callback) return list;

    };

    preorder(root = this.root, callback){

        const list = []; 

        if(!root) return

        
        else {

            list.push(root.data);
            if(root.left) list.push(this.preorder(root.left));
            if(root.right) list.push(this.preorder(root.right)); 

        }
        
       


        if(!callback) return list.join().split(',').map(Number);
    }

    inorder(root = this.root, callback){
        const list = []; 

        if(!root) return 
       
        else {
            if (callback) callback(root);
            if(root.left) list.push(this.inorder(root.left)); 
            list.push(root.data);
            if(root.right) list.push(this.inorder(root.right));
        }

            if(!callback) return list.join().split(',').map(Number);
            else return callback
        
    }

    postorder(root = this.root, callback){
        const list = []; 
    
            if(!root) return
            else {
                
                if(root.left) list.push(this.postorder(root.left));
                if(root.right) list.push(this.postorder(root.right)); 
                list.push(root.data);
            }
    
            if(!callback) return list.join().split(',').map(Number);
    }

    

      height(node){

       let leftCount = 0;
       let rightCount = 0;

        if(!node) return 0
        else {
            if(node.left) {
               leftCount = 1 + this.height(node.left)
                
            } else if(node.right) {
                rightCount = 1 + this.height(node.right)
            }
        }
        return leftCount < rightCount ? rightCount : leftCount
        
      }

      
      depth(node, root = this.root){

        let count = 0

        if(!root) return 1

        if(node != root.data){
            if(node < root.data){
                count = 1 + this.depth(node, root.left)
            }
            else {
                count = 1 + this.depth(node, root.left)
            }
        }
        
        return count


      }

    isBalanced(){
        let arr = this.inorder(); 

        for (let i = 0; i < arr.length - 1; i++) {
           if(arr[i+1] - arr[i] !== 1) return false
    }

    return true

 
}

    rebalance(){
        let arr = this.inorder();
        let newArr = []; 

        if(!this.isBalanced()){
            for(let i = 0; i < arr.length - 1; i++) {
            if(arr[i+1] - arr[i] !== 1) {
                    let count = arr[i+1] - arr[i]; 
                    newArr.push(arr[i])
                    for(let j = 0; j < count; ++j){
                        newArr.push(arr[i]+=1)
                    }
            } 
        }

          return  this.buildTree(newArr)

        }


        return "Don't Need Balance"
    }

}