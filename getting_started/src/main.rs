use std::io;
use rand::Rng;


fn main() {
 let x ={ 
    let y = 32; 
    y
};


println!("{}",add_five(x));

println!("{x:?}");

let fh = celicius_to_fahrenheit(39.0);
println!("Value to fahrenheit is {}", fh);

   loop {
       let random_num : u32 = rand::rng().random_range(0..=10);

       
        let mut number = String::new();
        println!("Enter any number: ");
        io::stdin().read_line(&mut number).expect("Error reading number from user");
        
        let  parsed_number : u32 = match number.trim().parse() {
            Ok(val) => val,
            _=> {
                println!("Error parsing number, enter a valid number.");
                return;
    }
};

if parsed_number == random_num {
    println!("Congratulations you won!");
    break;
}else {
    println!("Sorry you lost!, correct number was: {}.",random_num);
    continue 
}
}
}


fn add_five(num: i32) -> i32{
    println!("Good");
    num + 5

}

fn celicius_to_fahrenheit(c:f32) -> f32{
    (c- 32.0 ) * (5.0/9.0)
}