import { Controller, Get , UseGuards } from "@nestjs/common";
import { ApiService } from "./api.services";
import { AuthGuard } from "../auth/auth.guard";

@Controller('api')
@UseGuards(AuthGuard)
export class ApiController { 
    constructor(private readonly apiService : ApiService) { }
    @Get()
    async getApiKeys () { 
        return "API checking successfull"
    };
}