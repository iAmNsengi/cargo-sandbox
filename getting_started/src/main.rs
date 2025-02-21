use std::io;
use rand::Rng;


fn main() {
 let x ={ 
    let y = 32; 
    y
};

println!("{x:?}");
    loop {
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
let random_num : u32 = rand::rng().random_range(0..=10);

if parsed_number == random_num {
    println!("Congratulations you won!");
    break;
}else {
    println!("Sorry you lost!, correct number was: {}.",random_num)
}
}
}
