const { Entity, PrimaryColumn, Column } = require('typeorm');

@Entity('categories')
class Category {
    @PrimaryColumn()
    id

    @Column()
    name
}

module.exports = Category;
