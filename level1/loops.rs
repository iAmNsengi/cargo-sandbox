fn main(){
    for i in 0..10 {
        if i %2 == 0{
            println!("Even = {}",i)
        }
        else {
            println!("Odd = {}", i)
        }
    }

    // another possible way

    for i in 0..5{
        let even_or_odd = if i %2 == 0 {"even"} else {"odd"};
        println!("Number {} is {}", i, even_or_odd)
    }
}