const { async } = require("@firebase/util");
const crud = require("../../crud");
const tableName = "Products";
var fetch = require("node-fetch");


async function productsRegister(data = {
    name: "",
    description: "",
    price: 0,
    userCPF: "",
    userPassword: ""
}) {
    var user;

    console.log(data.userCPF, data.userPassword);
    try {

        const rawResponse = await fetch('http://destino:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ CPF: data.userCPF, Password: data.userPassword })
        });
        console.log("Chegou linha 26");
        user = await rawResponse.json();
        console.log("User", user);
        if (user.CPF === data.userCPF) {
            const product = await crud.save(tableName, undefined, data);
            return product;
        } else {
            return { error: "0001", message: "User not found!" };
        }
    } catch(error){
        console.log(error);
        return { error: "0001", message: "User not found!" };
    }

}

async function getProducts() {
    const products = await crud.get(tableName);
    return products;
}

async function getUserProducts(cpf) {
    const products = await crud.get(tableName);
    const userProducts = products.filter(product => product.userCPF === cpf);
    return userProducts;
}

module.exports = {
    productsRegister,
    getProducts,
    getUserProducts
}