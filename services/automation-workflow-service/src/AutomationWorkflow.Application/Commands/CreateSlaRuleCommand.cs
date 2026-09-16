using MediatR;
using AutomationWorkflow.Application.DTOs;

namespace AutomationWorkflow.Application.Commands;

public record CreateSlaRuleCommand() : IRequest<SlaRuleDto>;
