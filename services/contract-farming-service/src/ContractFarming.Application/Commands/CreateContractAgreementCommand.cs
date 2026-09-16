using MediatR;
using ContractFarming.Application.DTOs;

namespace ContractFarming.Application.Commands;

public record CreateContractAgreementCommand() : IRequest<ContractAgreementDto>;
