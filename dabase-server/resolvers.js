const db = require('./db')

const Client = {
    branch: ( root, args, context, info ) => {
        return db.branches.get(root.branch_id);
    }
}

const Branch = {
    clients: ( root, args, context, info ) => {
        
        const allClients = db.clients.list();
        let clientList = [];

        allClients.forEach( (client) => {
            if (client.branch_id == root.id) {
                clientList.push(client);
            }
        });
        
        return clientList;
    }
}

const Query = {
    clients: () => db.clients.list(),

    clientByID: ( root, args, context, info ) => {
        //args will contain parameter passed in query
        return db.clients.get(args.id);
    },

    branches: () => db.branches.list(),

    branchByID: ( root, args, context, info ) => {
        //args will contain parameter passed in query
        return db.branches.get(args.id);
    },
}

const Mutation = {
    createClient: (root,args,context,info) => {

        const data = args.data;
        const id = data.id, name = data.name, adress = data.adress;
        const balance = data.balance, branch = data.branch_id;

        const clients = db.clients.list();
        const branches = db.branches.list();

        if ( ( typeof id != "number" ) ) {
            // return `${typeof id}`;
            return `Given id must be a number.`;
        }
        clients.forEach((currClient) => {
            if ( currClient.id == id ) {
                return `A client with the id ${id} already exists. please enter an unregistered id.`;
            }
        });

        let branchExistFlag = false;
        branches.forEach((currBranch) => {
            if (currBranch.id == branch) {
                branchExistFlag = true;
            }
        });
        if ( !branchExistFlag ) {
            return `The branch id does not co-respond to an existing branch in the system.`;
        }

        db.clients.create({
            id: id,
            name: name,
            adress: adress,
            balance: balance,
            branch_id: branch
        });

        return "Client created succesfully";
    }
 }

module.exports = { Client, Branch, Query, Mutation }