"use strict";
const users = JSON.parse(localStorage.getItem('users') || '[]');
const fName = document.getElementById('fname');
const lName = document.getElementById('lname');
const number = document.getElementById('number');
const birth = document.getElementById('birth');
const age = document.getElementById('age');
const btn = document.querySelector('button');
const userList = document.getElementById('userList');
const errorMessage = document.getElementById('errorMessage');
const toastContainer = document.getElementById('toastContainer');
const addUser = () => {
    if (validateInputs()) {
        const newUser = {
            firstName: fName.value.trim(),
            lastName: lName.value.trim(),
            age: Number(age.value),
            birthDate: birth.value,
            phoneNumber: number.value.trim(),
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
        clearInputs();
        errorMessage.classList.add('hidden');
        showToast('Information added successfully!');
    }
    else {
        errorMessage.classList.remove('hidden');
    }
};
const validateInputs = () => {
    return (fName.value.trim() !== '' &&
        lName.value.trim() !== '' &&
        age.value.trim() !== '' &&
        birth.value.trim() !== '' &&
        number.value.trim() !== '');
};
const displayUsers = () => {
    userList.innerHTML = '';
    users.forEach((user, index) => {
        const userItem = document.createElement('li');
        userItem.classList.add('bg-accent', 'p-4', 'mb-4', 'shadow-md', 'border-solid', 'border-2', 'border-sky-500', 'rounded-md', 'flex', 'justify-between', 'flex-col', 'gap-10');
        userItem.innerHTML = `
            <div>
                <h3 class="text-xl font-semibold">Ism: ${user.firstName}</h3>
                <h3 class="text-xl font-semibold">Familya: ${user.lastName}</h3>
                <p class="text-gray-600">Yosh: ${user.age}</p>
                <p class="text-gray-600">Tug'ilgan yil: ${user.birthDate}</p>
                <p class="text-gray-600">Telefon raqam: ${user.phoneNumber}</p>
            </div>
            <button class="btn btn-danger " onclick="deleteUser(${index})">Delete</button>
        `;
        userList.appendChild(userItem);
    });
};
const clearInputs = () => {
    fName.value = '';
    lName.value = '';
    age.value = '';
    birth.value = '';
    number.value = '';
};
const showToast = (message) => {
    const toastMessage = toastContainer.querySelector('.toast-message');
    toastMessage.textContent = message;
    toastContainer.classList.remove('hidden');
    setTimeout(() => {
        toastContainer.classList.add('hidden');
    }, 3000);
};
const deleteUser = (index) => {
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
    showToast("Information deleted successfully!");
};
document.addEventListener('DOMContentLoaded', displayUsers);
btn.addEventListener('click', addUser);
