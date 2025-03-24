mod fibonacci;
mod is_even;
mod string_length;

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
    )
}
