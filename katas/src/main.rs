mod fibonacci;
mod is_even;
mod string_length;

pub struct User {
    username: String,
    password: String,
    email: String,
    sign_in_count: i32,
}

struct Rect {
    width: i32,
    height: i32,
}

impl Rect {
    fn area(&self) -> i32 {
        self.width * self.height
    }
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

    let rect1 = Rect {
        width: 12,
        height: 32,
    };
    println!(
        "The area of the rectangle is with width {} and height {} is {}",
        rect1.width,
        rect1.height,
        rect1.area()
    )
}
