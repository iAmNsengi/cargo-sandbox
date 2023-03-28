use std::io;
fn main() {
  println!("Hey what's your name?");
  let mut name = String::new();

  io::stdin().read_line(&mut name);
println!("Welcome {}, to our app.", name.trim())
}
