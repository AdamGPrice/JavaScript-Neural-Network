class Matrix {
    constructor(rows, columns, value) {
        this.rows = rows;
        this.columns = columns;
        this.data = new Array(this.rows);

        for (let i = 0; i < this.rows; i++) {
            this.data[i] = new Array(this.columns);
        }
        if (value) {
            this.setValue(value);
        } else {
            this.randomise();
        }
    }

    setValue(value) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.data[i][j] = value;
            }
        }
    }

    randomise() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.data[i][j] = Math.random();
            }
        }
    }

    static add(a, b) {
        if (a.rows == b.rows && a.columns == b.columns) {
            let matrix = new Matrix(a.rows, b.columns);

            for (let i = 0; i < a.rows; i++) {
                for (let j = 0; j < a.columns; j++) {
                    matrix.data[i][j] = a.data[i][j] + b.data[i][j];
                }
            }
            return matrix;
        } else {
            throw RangeError('The rows and columns are not the same');
        }
    }

    static subtract(a, b) {
        if (a.rows == b.rows && a.columns == b.columns) {
            let matrix = new Matrix(a.rows, b.columns);

            for (let i = 0; i < a.rows; i++) {
                for (let j = 0; j < a.columns; j++) {
                    matrix.data[i][j] = a.data[i][j] - b.data[i][j];
                }
            }
            return matrix;
        } else {
            throw RangeError('The rows and columns are not the same');
        }
    }

    static multiply(a, b) {
        if (a.rows == b.rows && a.columns == b.columns) {
            let matrix = new Matrix(a.rows, b.columns);

            for (let i = 0; i < a.rows; i++) {
                for (let j = 0; j < a.columns; j++) {
                    matrix.data[i][j] = a.data[i][j] * b.data[i][j];
                }
            }
            return matrix;
        } else {
            throw RangeError('The rows and columns are not the same');
        }
    }

    static product(a, b) {
        if (a.columns == b.rows) {
            let matrix = new Matrix(a.rows, b.columns);

            for (let i = 0; i < matrix.rows; i++) {
                for (let j = 0; j < matrix.columns; j++) {
                    let sum = 0;
                    for(let k = 0; k < a.columns; k++) {
                        sum += a.data[i][k] * b.data[k][j];
                    }
                    matrix.data[i][j] = sum;
                } 
            }
            return matrix;
        } else {
            throw RangeError('The rows and columns do not match');
        }
    }

    static transpose(a) {   
        let matrix = new Matrix(a.columns, a.rows);

        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.columns; j++) {
                matrix.data[j][i] = a.data[i][j];
            }
        }
        return matrix
    }
} 