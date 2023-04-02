import { getRounds, hashSync } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    UpdateDateColumn,
} from 'typeorm';
import { Contato } from './contacts.entity';

@Entity('client')
class Cliente {
    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone: string;

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Contato, (contact) => contact.clients)
    contacts: Contato[];

    passwordHash() {
        const isEncrypted = getRounds(this.password);
        if (!isEncrypted) {
            this.password = hashSync(this.password, 10);
        }
    }
}

export { Cliente };
