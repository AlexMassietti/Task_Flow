import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { DashboardDto } from './interfaces/dashboard.dto';
import { UserDto } from './interfaces/user.dto';
import { JwtRs256Guard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../authorization/permission.guard';
import { Permissions } from '../authorization/permission.decorator';
import { DashboardInvitationDto } from './dto/dashboard-invitation.dto';
import { CreateDashboardDto, UpdateDashboardDto } from '@shared/dtos';
import { CreateDashboardDoc } from './docs/create-dashboard.doc';
import { UpdateDashboardDoc } from './docs/update-dashboard.doc';
import { DeleteDashboardDoc } from './docs/delete-dashboard.doc';
import { TaskResponseDto } from '@shared/dtos';
import { User } from '@api-gateway/common/decorators/user.decorator';

@Controller('dashboard')
@ApiBearerAuth('access-token')
@UseGuards(JwtRs256Guard, PermissionsGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Post()
  @Permissions('dashboard.create')
  @CreateDashboardDoc()
  create(
    @Body() createDashboardDto: CreateDashboardDto, 
    @User('sub') userId: number 
  ) {
    return this.dashboardService.create(createDashboardDto, userId);
  }

  @Patch(':id')
  @Permissions('dashboard.update')
  @UpdateDashboardDoc()
  update(@Body() updateDashboardDto: UpdateDashboardDto, @Param('id') id: number) {
    return this.dashboardService.update(updateDashboardDto, id)
  }

  @Delete(':id')
  @Permissions('dashboard.delete')
  @HttpCode(204)
  @DeleteDashboardDoc()
  delete(@Param('id') id: number) {
    return this.dashboardService.delete(id)
  }

  @ApiOkResponse({ type: DashboardDto, isArray: true })
  @Get('owned')
  @Permissions('dashboard.read')
  @ApiOperation({ summary: 'Obtener dashboards propios del usuario autenticado' })
  async getOwnedDashboards(@User('sub') userId: number) {
    return this.dashboardService.getOwnedDashboards(userId);
  }

  @ApiOkResponse({ type: DashboardDto, isArray: true })
  @Get('shared')
  @Permissions('dashboard.read')
  @ApiOperation({ summary: 'Obtener dashboards compartidos con el usuario autenticado' })
  async getSharedDashboards(@User('sub') userId: number) {
    return this.dashboardService.getSharedDashboards(userId);
  }

  @ApiOkResponse({ type: TaskResponseDto, isArray: true })
  @Get(':id/tasks')
  @Permissions('task.read')
  async getDashboardTasks(@Param('id') id: number) {
    return this.dashboardService.getDashboardTasks(id);
  }

  @ApiOkResponse({ type: UserDto, isArray: true })
  @Get(':id/users')
  @Permissions('dashboard.members.read')
  async getDashboardUsers(@Param('id') id: number) {
    return this.dashboardService.getDashboardUsers(id);
  }


  @ApiOkResponse({ type: DashboardInvitationDto })
  @Post('dashboard-invite')
  @Permissions('dashboard.members.update')
  @ApiOperation({ summary: 'Invitar un usuario a un dashboard' })
  @ApiBody({ type: DashboardInvitationDto })
  async inviteToDashboard(
    @User('sub') userId: number,
    @Body() dto: DashboardInvitationDto
  ) {
    dto.invitedBy = userId; 
    const mailData = await this.dashboardService.processDashboardInvitation(dto);
    return this.dashboardService.sendDashboardInvitationMail(mailData);
  }
}
