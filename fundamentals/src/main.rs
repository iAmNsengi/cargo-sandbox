use std::{io, cmp::Ordering};
use rand::Rng;

fn main() {
//   println!("Hey what's your name?");
//   let mut name = String::new();

//   io::stdin().read_line(&mut name).expect("Error reading input");
// println!("Welcome {}, to our app.", name.trim())

loop{
     println!("\nHey guess a number from 1-10: ");
    let mut guess = String::new();
    let correct_num  = rand::rng().random_range(1..=10);

    io::stdin().read_line(&mut guess).expect("Error in reading input");
   
    println!("You guessed {}.", guess.trim());

    let guess:u32 = match guess.trim().parse() {
        Ok(num) => num,
        Err(e) => {
            println!("Invalid number try again \n");
            continue;
        }
    };

    println!("The correct number is {}",correct_num);

    // let winner = if correct_num == parsed_num {String::from("User")} else {String::from("PC")};

    let winner = match guess.cmp(&correct_num) {
    Ordering::Equal => String::from("User"),
    _ => String::from("PC")
    };
    if winner == "User" {
    break;
    }
    println!("The winner is {}", winner)

    };
}
