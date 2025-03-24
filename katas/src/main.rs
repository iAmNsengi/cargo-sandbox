mod fibonacci;
mod is_even;
mod string_length;

pub struct User {
    username: String,
    password: String,
    email: String,
    sign_in_count: i32,
}

fn main() {
    let num = 11;
    if is_even::is_even(num) {
        println!("Number {num} is even ");
    } else {
        println!("Number {num} is not even ");
    }

    println!(
        "Fibonacci of numbers to {num} is {:?} ",
        fibonacci::fibonacci(num)
    );

    println!(
        "Get length of a string: {}",
        string_length::get_string_length("iAmNsengi")
    );

    let user = User {
        username: String::from("nsengi"),
        password: String::from("nsengi"),
        email: String::from("nsengi"),
        sign_in_count: 1,
    };

    println!("User info {:?}", user.username);
    println!("User password {:?}", user.password);
    println!("User email {:?}", user.email);
    println!("User sign in count {:?}", user.sign_in_count);
}
