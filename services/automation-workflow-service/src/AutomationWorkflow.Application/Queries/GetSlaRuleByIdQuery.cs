using MediatR;
using AutomationWorkflow.Application.DTOs;

namespace AutomationWorkflow.Application.Queries;

public record GetSlaRuleByIdQuery(Guid Id) : IRequest<SlaRuleDto?>;
