interface User {
    firstName: string;
    lastName: string;
    age: number;
    birthDate: string;
    phoneNumber: string;
}

const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

const fName = document.getElementById('fname') as HTMLInputElement;
const lName = document.getElementById('lname') as HTMLInputElement;
const number = document.getElementById('number') as HTMLInputElement;
const birth = document.getElementById('birth') as HTMLInputElement;
const age = document.getElementById('age') as HTMLInputElement;
const btn = document.querySelector('button') as HTMLButtonElement;
const userList = document.getElementById('userList') as HTMLUListElement;
const errorMessage = document.getElementById('errorMessage') as HTMLElement;
const toastContainer = document.getElementById('toastContainer') as HTMLElement;

const addUser = () => {
    if (validateInputs()) {
        const newUser: User = {
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
    } else {
        errorMessage.classList.remove('hidden');
    }
};

const validateInputs = (): boolean => {
    return (
        fName.value.trim() !== '' &&
        lName.value.trim() !== '' &&
        age.value.trim() !== '' &&
        birth.value.trim() !== '' &&
        number.value.trim() !== ''
    );
};

const displayUsers = () => {
    userList.innerHTML = '';
    users.forEach((user, index) => {
        const userItem = document.createElement('li');
        userItem.classList.add('bg-accent', 'p-4', 'mb-4', 'shadow-md', 'border-solid', 'border-2', 'border-sky-500', 'rounded-md', 'flex', 'justify-between',  'flex-col', 'gap-10');
        userItem.innerHTML = `
            <div>
                <h3 class="text-xl font-semibold">Ism: ${user.firstName}</h3>
                <h3 class="text-xl font-semibold">Familya: ${user.lastName}</h3>
                <p class="text-gray-600">Yosh: ${user.age}</p>
                <p class="text-gray-600">Tug'ilgan yil: ${user.birthDate}</p>
                <p class="text-gray-600">Telefon raqam: ${user.phoneNumber}</p>
            </div>
            <button class="btn btn-danger ml-4" onclick="deleteUser(${index})">Delete</button>
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

const showToast = (message: string) => {
    const toastMessage = toastContainer.querySelector('.toast-message') as HTMLElement;
    toastMessage.textContent = message;
    toastContainer.classList.remove('hidden');
    setTimeout(() => {
        toastContainer.classList.add('hidden');
    }, 3000);
};

const deleteUser = (index: number) => {
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
    showToast("Information deleted successfully!");
};

document.addEventListener('DOMContentLoaded', displayUsers);
btn.addEventListener('click', addUser);
