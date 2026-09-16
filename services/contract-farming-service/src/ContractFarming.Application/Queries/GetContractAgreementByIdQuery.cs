using MediatR;
using ContractFarming.Application.DTOs;

namespace ContractFarming.Application.Queries;

public record GetContractAgreementByIdQuery(Guid Id) : IRequest<ContractAgreementDto?>;
