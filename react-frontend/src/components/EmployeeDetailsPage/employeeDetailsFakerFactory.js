
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.name.fullName(),
age: faker.datatype.number(""),
department: faker.commerce.department(),
yearOfService: faker.datatype.number(""),
jobTitle: faker.name.jobTitle(),
skills: faker.company.suffixes(),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
