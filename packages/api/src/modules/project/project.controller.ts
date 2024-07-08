import { Controller , Get, Post , Put , Delete , Body, Param , UseGuards} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateProjectDto } from "./dto/create-project.dto";

@Controller('project')
@UseGuards(AuthGuard)
export class ProjectController { 

    constructor( private readonly projectService : ProjectService  ) { }
    @Post('')
    async createAProject( @Body() body : CreateProjectDto ) { 
        return this.projectService.createProject(body);
    }

    @Get('/:id')
    async getAProject(@Param('id') id : string) { 

    } 

    @Put('/:id')
    async updateAProject() { 

    }

    @Get('s')
    async getProjects () { 
        return this.projectService.getCreatedProjects();
    }
   
}