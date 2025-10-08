import { SosService } from './sos.service';
import { CreateSosDto, UpdateSosDto } from './dto/sos.dto';
export declare class SosController {
    private readonly sosService;
    constructor(sosService: SosService);
    create(createSosDto: CreateSosDto, req: any): Promise<import("../entities/sos.entity").Sos>;
    findAll(req: any): Promise<import("../entities/sos.entity").Sos[]>;
    getActiveSos(req: any): Promise<import("../entities/sos.entity").Sos[]>;
    getMySos(req: any): Promise<import("../entities/sos.entity").Sos[]>;
    findOne(id: number, req: any): Promise<import("../entities/sos.entity").Sos>;
    update(id: number, updateSosDto: UpdateSosDto, req: any): Promise<import("../entities/sos.entity").Sos>;
    resolveSos(id: number, req: any): Promise<import("../entities/sos.entity").Sos>;
}
