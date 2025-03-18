pub fn run() {
    // print to console
    println!("Hello, from print file");

    // formatting
    println!("A number: {}", 1);
    println!("{} is from {}", "Nsengi", "Kigali");

    //positional arguments
    println!(
        "{0} is from {1} and {0} likes to {2}",
        "Nsengi", "Kigali", "Code"
    );

    // named arguments
    println!(
        "{name} likes to play {activity}",
        name = "Nsengi",
        activity = "Piano"
    );

    // placeholder traints
    println!("Binary '{:b}', Hexadecimal '{:x}' Octal '{:o}'", 10, 10, 10);

    // placeholder for debug trait
    println!("{:?}", (1, true, "hello"))
}
