use std::io;
fn main() {
//   println!("Hey what's your name?");
//   let mut name = String::new();

//   io::stdin().read_line(&mut name).expect("Error reading input");
// println!("Welcome {}, to our app.", name.trim())

println!("Hey guess a number: ");
let mut num = String::new();

io::stdin().read_line(&mut num).expect("Error in reading input");
println!("You guessed {}.", num.trim())
}
