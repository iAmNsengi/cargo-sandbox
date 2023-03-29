use std::{io, cmp::Ordering};
use rand::Rng;

fn main() {
//   println!("Hey what's your name?");
//   let mut name = String::new();

//   io::stdin().read_line(&mut name).expect("Error reading input");
// println!("Welcome {}, to our app.", name.trim())

println!("Hey guess a number from 1-10: ");
let mut num = String::new();
let correct_num  = rand::rng().random_range(1..=10);

io::stdin().read_line(&mut num).expect("Error in reading input");
println!("You guessed {}.", num.trim());
println!("The correct number is {}",correct_num);

let num : i32 = num.trim().parse().expect("Error parsing to number");

// let winner = if correct_num == parsed_num {String::from("User")} else {String::from("PC")};

let winner = match num.cmp(&correct_num) {
    Ordering::Equal => String::from("User"),
    _ => String::from("PC")
};

println!("The winner is {}", winner)
}
