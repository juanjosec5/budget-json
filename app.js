//get alL HTML Elements
const titleSalary = document.querySelector('.salary-breakdown__title');
const remainingSalary = document.querySelector('.remaining');
const showAddExpenseBtn = document.querySelector('.show-add-expense');
const addExpenseModal = document.querySelector('.add-expense');
const addExpenseBtn = document.querySelector('.add-expense__button');
const expenseName = document.querySelector('.add-expense__name');
const expenseAmount = document.querySelector('.add-expense__amount');
const expensesList = document.querySelector('.salary-breakdown__expenses-list');
const deleteExpenseItem = document.querySelectorAll('.expense-item__delete-btn');

//Event Listeners
showAddExpenseBtn.addEventListener('click', () => handleModal());
addExpenseBtn.addEventListener('click', () => {
    let amount = parseInt(expenseAmount.value);
    let name = expenseName.value;

    if (
        name &&
        isNaN(name) &&
        amount &&
        !isNaN(amount)
        ) {
        handleModal();
        createExpense(expenseName.value, Number(expenseAmount.value))
    }
    clearInputs();
    });

const removeItem = (ev) => {
    const parent = ev.parentElement;
    expensesList.removeChild(parent);
}

const budgetConstantsUrl = 'https://raw.githubusercontent.com/juanjosec5/budget-json/main/budget-constants.json';

const getBudgetConstants = async () => {
    try {
        const budgetConstantsResponse = await fetch(budgetConstantsUrl);
        const budgetConstants = await budgetConstantsResponse.json();

        return budgetConstants;
    } catch (error) {
        console.error(error);
    }

}

const renderBudgetData = async () => {
    const budgetData = await getBudgetConstants();

    titleSalary.innerHTML = `<span class="smallTitle">Monthly Salary:</span> <br /> ${formatNumbers(budgetData.salary)} COP`;
    remainingSalary.innerHTML = `<span class="smallTitle">Remaining Salary:</span> <br /> ${formatNumbers(budgetData.salary)} COP`;
}

const formatNumbers = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const handleModal = () => {
    if (!addExpenseModal.classList.contains('closed')) {
        addExpenseModal.classList.add('closed');
        showAddExpenseBtn.classList.remove('clicked');
        return;
    }
    showAddExpenseBtn.classList.add('clicked');
    addExpenseModal.classList.remove('closed');
}

const createExpense = (name, value) => {
    if (name !== '' && value !== 0) {
        const newListItem = document.createElement('li');

        newListItem.classList.add('expense-item');
        newListItem.innerHTML = `<span class="expense-item__details">
                                    <span class="expense-item__name">${name}</span> <br /> <span class="expense-item__amount">$${formatNumbers(value)} COP</span>
                                </span>
                                <button class="expense-item__delete-btn" onclick="removeItem(this)">&#128465;</button>`
        expensesList.appendChild(newListItem);
    } else {
       return;
    }
}

const clearInputs = () => {
    expenseName.value = '';
    expenseAmount.value = '';
}

window.onload = () => {
    console.log('LOADED');
    renderBudgetData();
}