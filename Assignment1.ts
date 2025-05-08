{
    
    function formatString(input: string, toUpper?: boolean): string {
        const isNumber: boolean = /^\d+$/.test(input);
        const isEmptyString: string = "";
        if (typeof input === "string" && !isNumber && input !== isEmptyString) {
            var output: string = "";
            if (toUpper || toUpper == null) {
                const upperCaseLetters = input.toUpperCase();
                output += upperCaseLetters;
            }
            else {
                const lowerCaseLetters = input.toLowerCase();
                output += lowerCaseLetters;
            }
            return output;
        }
        else {
            return "Wrong Input Type!";
        }
    }


    function filterByRating(items: { title: string; rating: number }[]): { title: string; rating: number }[] {
      const filteredItems :{
        title: string;
        rating: number
      }[] = [];

      items.forEach((item: {title: string, rating: number}) => {
        if(item.rating >= 4){
            filteredItems.push(item);
        }
      });

      return filteredItems;
    }


    function concatenateArrays<T>(...arrays: T[][]): T[] {
        const result: T[] = [];

        arrays.forEach((array:T[]) => {
            array.forEach((item: T) => {
               result.push(item); 
            });
        });

        return result; 
    }


    class Vehicle {
        private make: string;
        private year: number;

        constructor(make: string, year: number) {
            this.make = make;
            this.year = year;
        }

        public getInfo() {
            console.log(`Make: ${this.make}, Year: ${this.year}`)
        }
    }

    class Car extends Vehicle {
        private model: string;

        constructor(make: string, year: number, model: string) {
            super(make, year);
            this.model = model;
        }

        getModel() {
            console.log(`Model: ${this.model}`);
        }
    }


    function processValue(value: string | number): number {
        var output: number = 0;
        if (typeof value === "string") {
            output = value.length;
            return output;
        }
        else if (typeof value === "number") {
            output = value * 2;
            return output;
        }
        return output;

    }


    interface Product {
        name: string;
        price: number;
      }

    function getMostExpensiveProduct(products: Product[]): Product | null {
        if(products){
            products.sort((a,b) => a.price - b.price);
            const lastInstance = products.lastIndexOf 
            return products[products.length -1];
        }
        else return null;
    }


    enum Day {
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    }

    function getDayType(day: Day): string {
        if (day === Day.Saturday || day === Day.Sunday) {
            return "Weekend";
        }
        else {
            return "Weekday";
        }
    }


    async function squareAsync(n: number): Promise<number> {
        return new Promise((resolve,reject) => {
            if(n<0){
                reject (new Error("Negetive number is not allowed"));
            }
            else{
                setTimeout(() => {
                    console.log("Output after 1s:");
                    resolve(n*n);
                },1000);
            }
        });
    }

    //
}