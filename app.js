const titleSalary = document.querySelector('.salary-breakdown__title');
const remainingSalary = document.querySelector('.salary-breakdown__remaining');

window.onload = () => {
    renderBugetData();
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

const renderBugetData = async () => {
    const budgetData = await getBudgetConstants();

    titleSalary.innerText = `Monthly Salary: ${formatNumbers(budgetData.salary)} COP`;
    remainingSalary.innerText = `Remaining Salary: ${formatNumbers(budgetData.salary)} COP`;
}

const formatNumbers = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");