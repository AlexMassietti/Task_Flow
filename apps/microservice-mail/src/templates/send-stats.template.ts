import { DashboardStatsDto } from '../mail/dto/dashboard-stats.dto';

export const statsReportTemplate = (username: string, stats: DashboardStatsDto) => {
  // Colores para estados
  const colors = {
    primary: '#4f46e5',   // Indigo
    success: '#10b981',   // Verde
    warning: '#f59e0b',   // Ambar
    danger: '#ef4444',    // Rojo
    bg: '#f3f4f6'         // Gris claro
  };

  // Convertimos el string "50%" a número para validaciones si fuera necesario, 
  // pero para CSS width lo usamos directo.
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reporte Mensual</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${colors.bg}; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td style="padding: 20px 0;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <tr>
            <td bgcolor="${colors.primary}" style="padding: 30px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">Reporte de Dashboard</h1>
              <p style="color: #e0e7ff; margin: 5px 0 0 0; font-size: 16px;">${stats.dashboardName}</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; margin-top: 0;">Hola <strong>${username}</strong>,</p>
              <p style="color: #666666; font-size: 14px; line-height: 1.5;">
                Aquí tienes el resumen de rendimiento correspondiente al periodo <strong>${stats.month}/${stats.year}</strong>.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Tasa de Finalización</p>
                <div style="font-size: 48px; font-weight: 800; color: ${colors.primary};">${stats.completionRate}</div>
                
                <div style="background-color: #e5e7eb; border-radius: 999px; height: 10px; width: 80%; margin: 10px auto; overflow: hidden;">
                  <div style="background-color: ${colors.primary}; height: 100%; width: ${stats.completionRate}; border-radius: 999px;"></div>
                </div>
              </div>

              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                <tr>
                  <td width="50%" style="padding-right: 10px; padding-bottom: 20px;">
                    <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid ${colors.primary};">
                      <div style="font-size: 12px; color: #6b7280;">Total Tareas</div>
                      <div style="font-size: 20px; font-weight: bold; color: #111827;">${stats.totalTasks}</div>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 10px; padding-bottom: 20px;">
                    <div style="background-color: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid ${colors.success};">
                      <div style="font-size: 12px; color: #065f46;">✅ Realizadas</div>
                      <div style="font-size: 20px; font-weight: bold; color: #064e3b;">${stats.completedTasks}</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding-right: 10px;">
                    <div style="background-color: #fffbeb; padding: 15px; border-radius: 8px; border-left: 4px solid ${colors.warning};">
                      <div style="font-size: 12px; color: #92400e;">⏳ En Progreso</div>
                      <div style="font-size: 20px; font-weight: bold; color: #78350f;">${stats.inProgressTasks}</div>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 10px;">
                    <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid ${colors.danger};">
                      <div style="font-size: 12px; color: #991b1b;">📅 Pendientes</div>
                      <div style="font-size: 20px; font-weight: bold; color: #7f1d1d;">${stats.pendingTasks}</div>
                    </div>
                  </td>
                </tr>
              </table>

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                <tr>
                    <td align="center">
                    <a href="${stats.dashboardLink}" style="background-color: #4f46e5; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                        Ver Dashboard Completo
                    </a>
                    </td>
                </tr>
            </table>

            </td>
          </tr>

          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                Estás recibiendo este correo porque eres miembro del dashboard "${stats.dashboardName}".
              </p>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #9ca3af;">
                &copy; 2026 Tu Empresa. Todos los derechos reservados.
              </p>
            </td>
          </tr>
        </table>
        
      </td>
    </tr>
  </table>

</body>
</html>
  `;
};