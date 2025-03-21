pub fn fibonacci(num: i32) -> Vec<i32> {
    let mut series: Vec<i32> = vec![0, 1];

    if num < 1 {
        return series;
    }
    loop {
        if num < series[series.len() - 1] {
            break;
        }
        series.push(series[series.len() - 2] + series[series.len() - 1])
    }
    series
}
