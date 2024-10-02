
import { faker } from "@faker-js/faker";
export default (user,count,employeeNameIds,employeeInterestIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
employeeName: employeeNameIds[i % employeeNameIds.length],
employeeInterest: employeeInterestIds[i % employeeInterestIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
