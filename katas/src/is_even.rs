// Write a function is_even that takes a number as an input and returns true if it is even
pub fn run() {
    let num = 10;
    let is_even = if num % 2 == 0 { "even" } else { "odd" };
    println!("Number {num} is {}", is_even)
}
