import { Repository } from 'typeorm';
import { Sos } from '../entities/sos.entity';
import { User } from '../entities/user.entity';
import { Request } from '../entities/request.entity';
import { CreateSosDto, UpdateSosDto } from './dto/sos.dto';
export declare class SosService {
    private sosRepository;
    private userRepository;
    private requestRepository;
    constructor(sosRepository: Repository<Sos>, userRepository: Repository<User>, requestRepository: Repository<Request>);
    create(createSosDto: CreateSosDto, user: any): Promise<Sos>;
    findAll(user: any): Promise<Sos[]>;
    getActiveSos(user: any): Promise<Sos[]>;
    getMySos(user: any): Promise<Sos[]>;
    findOne(id: number, user: any): Promise<Sos>;
    update(id: number, updateSosDto: UpdateSosDto, user: any): Promise<Sos>;
    resolveSos(id: number, user: any): Promise<Sos>;
    private canAccessSos;
}
