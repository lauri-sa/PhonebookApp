"use strict";

const input = require('readline-sync');

// Define an array to store Person objects representing phonebook entries
const phoneBook = [];

// Function to add a new person to the phonebook
const AddPerson = (phoneBookArray) => {
    console.clear();

    let name;
    let phoneNumber;
    let validName = false;
    const regex = /^\d{10}$/; // Regular expression for validating a 10-digit phone number

    console.log("Add a person");

    // Validate inputted name
    do{
        name = input.question('\nEnter name: ');

        if(name.length < 1){
            console.log('Invalid name. Name cannot be empty.');
        }
        else if(phoneBookArray.some((person) => person.name.toLowerCase() === name.toLowerCase())){
            console.log('Invalid name. Name already exists in the phonebook.');
        }
        else{
            validName = true;
        }
    } while(!validName);

    // Validate inputted phone number
    do{
        phoneNumber = input.question('\nEnter phone number: ');

        if(!regex.test(phoneNumber)){
            console.log('Invalid phone number. Phone number must be 10 digits long.');
        }
    } while(!regex.test(phoneNumber));

    // Create a new person object and add it to the phonebook array
    const person = {name: name, phoneNumber: phoneNumber};
    
    phoneBookArray.push(person);

    console.log(`\n${name} has been added to the phonebook.\n`);

    input.question('Press enter to continue...');
};

// Function to display all persons in the phonebook
const ShowAllPersons = (phoneBookArray) => {
    console.clear();

    console.log("Persons in the phonebook:\n");

    // Iterate through the phonebook and display each person's name and phone number
    phoneBookArray.forEach((person) => {
        console.log(`Name: ${person.name}\nPhone Number: ${person.phoneNumber}\n`);
    });

    input.question('Press enter to continue...');
};

// Function to search for a person in the phonebook and display their phone number
const SearchPerson = (phoneBookArray) => {
    console.clear();

    console.log("Search a person\n");

    // Input the name of the person to search for
    const name = input.question('Enter a name of the person you want to search: ');

    // Get the phone number of the specified person
    const phoneNumber = GetPhoneNumber(phoneBookArray, name);

    // Display the search result message
    const message = phoneNumber === null ? `\nName was not found in the phonebook.\n` : `\nPhone number of ${name} is ${phoneNumber}.\n`;
    console.log(message);

    input.question('Press enter to continue...');
};

// Function to retrieve the phone number of a person by their name
const GetPhoneNumber = (phoneBookArray, name) => {
    let phoneNumber = null;

    // Iterate through the phonebook to find the specified person's phone number
    phoneBookArray.forEach((person) => {
        if(person.name === name){
            phoneNumber = person.phoneNumber;
        }
    });

    return phoneNumber;
}

// Function to delete a person from the phonebook by name
const DeletePerson = (phoneBookArray) => {
    console.clear();

    console.log("Delete a person\n");

    // Input the name of the person to delete
    const name = input.question('Enter a name of the person you want to delete: ');

    // Find the index of the person in the phonebook array
    const index = phoneBookArray.findIndex((person) => person.name === name);

    // Delete the person if found and display the appropriate message
    if (index !== -1) {
        phoneBookArray.splice(index, 1);
        console.log(`\n${name} has been deleted from the phonebook.\n`);
    } else {
        console.log(`\nThe phonebook does not contain that name.\n`);
    }

    input.question('Press enter to continue...');
};

// Main loop
while(true){

    console.clear();

    console.log("Phonebook Application\n");

    console.log("1. Add a person.\n");

    console.log("2. Show all persons.\n");

    console.log("3. Search a person.\n");

    console.log("4. Delete a person.\n");

    console.log("5. Quit.\n");

    // Prompt the user to choose an option
    const command = input.question('Choose an option: ');

    // Call the appropriate function based on the user's choice
    if(command === '1'){
        AddPerson(phoneBook);
    }
    else if(command === '2'){
        ShowAllPersons(phoneBook);
    }
    else if(command === '3'){
        SearchPerson(phoneBook);
    }
    else if(command === '4'){
        DeletePerson(phoneBook);
    }
    else if(command === '5'){
        break; // Exit the application if the user chooses to quit
    }
};