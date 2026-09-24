using CoreAdmin.Domain.Common;

namespace CoreAdmin.Domain.Entities;

public class Organization : BaseEntity
{
    public string Name { get; set; } = "";
    public string LegalEntityType { get; set; } = "Company";
    public Guid? ParentOrganizationId { get; set; }
    public string Country { get; set; } = "Ethiopia";
    public bool IsActive { get; set; } = true;
}

public class UserRole : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid RoleId { get; set; }
    public Guid? BranchScopeId { get; set; }
    public DateTimeOffset ValidFrom { get; set; }
    public DateTimeOffset? ValidTo { get; set; }
    public bool IsActive { get; set; } = true;
}

public class PermissionOverride : BaseEntity
{
    public Guid UserId { get; set; }
    public string PermissionCode { get; set; } = "";
    public string Effect { get; set; } = "Deny";
    public Guid? BranchScopeId { get; set; }
    public DateTimeOffset? ExpiresAt { get; set; }
    public string Reason { get; set; } = "";
}

public class FieldPermissionRule : BaseEntity
{
    public Guid RoleId { get; set; }
    public string EntityName { get; set; } = "";
    public string FieldName { get; set; } = "";
    public string Access { get; set; } = "hidden";
}

public class Delegation : BaseEntity
{
    public Guid OrganizationId { get; set; }
    public Guid DelegatorUserId { get; set; }
    public Guid DelegateUserId { get; set; }
    public Guid RoleId { get; set; }
    public Guid? BranchScopeId { get; set; }
    public DateTimeOffset StartsAt { get; set; }
    public DateTimeOffset EndsAt { get; set; }
    public string Status { get; set; } = "Active";
    public string Reason { get; set; } = "";
}

public class ApprovalChain : BaseEntity
{
    public Guid OrganizationId { get; set; }
    public string TransactionType { get; set; } = "";
    public string Department { get; set; } = "";
    public decimal MinAmount { get; set; }
    public decimal? MaxAmount { get; set; }
    public bool IsActive { get; set; } = true;
    public List<ApprovalStage> Stages { get; set; } = [];
}

public class ApprovalStage : BaseEntity
{
    public Guid ApprovalChainId { get; set; }
    public int Number { get; set; }
    public Guid ApproverRoleId { get; set; }
    public bool DualAuthorization { get; set; }
    public int SlaHours { get; set; } = 48;
}

public class ApprovalRequest : BaseEntity
{
    public Guid OrganizationId { get; set; }
    public Guid? BranchId { get; set; }
    public Guid ApprovalChainId { get; set; }
    public Guid SubmitterId { get; set; }
    public string Reference { get; set; } = "";
    public decimal Amount { get; set; }
    public int CurrentStage { get; set; } = 1;
    public string Status { get; set; } = "Pending";
    public Guid ConcurrencyStamp { get; set; } = Guid.NewGuid();
    public List<ApprovalDecision> Decisions { get; set; } = [];

    public void Decide(Guid actorId, Guid authorityOwnerId, bool approve, string reason, ApprovalStage stage)
    {
        if (Status != "Pending") throw new InvalidOperationException("This request is already closed.");
        if (actorId == SubmitterId || authorityOwnerId == SubmitterId)
            throw new InvalidOperationException("Self-approval, including delegated self-approval, is forbidden.");
        if (Decisions.Any(x => x.StageNumber == CurrentStage && (x.ActorId == actorId || x.AuthorityOwnerId == authorityOwnerId)))
            throw new InvalidOperationException("This approver has already decided at this stage.");
        Decisions.Add(new ApprovalDecision { ApprovalRequestId = Id, ActorId = actorId, AuthorityOwnerId = authorityOwnerId,
            StageNumber = CurrentStage, Approved = approve, Reason = reason });
        if (!approve) Status = "Rejected";
        else if (Decisions.Count(x => x.StageNumber == CurrentStage && x.Approved) >= (stage.DualAuthorization ? 2 : 1)) CurrentStage++;
    }
}

public class ApprovalDecision : BaseEntity
{
    public Guid ApprovalRequestId { get; set; }
    public Guid ActorId { get; set; }
    public Guid AuthorityOwnerId { get; set; }
    public int StageNumber { get; set; }
    public bool Approved { get; set; }
    public string Reason { get; set; } = "";
}

public class AuthToken : BaseEntity
{
    public Guid UserId { get; set; }
    public string Hash { get; set; } = "";
    public string Kind { get; set; } = "Refresh";
    public Guid FamilyId { get; set; } = Guid.NewGuid();
    public DateTimeOffset ExpiresAt { get; set; }
    public DateTimeOffset? ConsumedAt { get; set; }
    public DateTimeOffset? RevokedAt { get; set; }
    public bool MfaVerified { get; set; }
    public int Attempts { get; set; }
    public Guid ConcurrencyStamp { get; set; } = Guid.NewGuid();
}

public class OutboxMessage : BaseEntity
{
    public string EventType { get; set; } = "";
    public string Payload { get; set; } = "{}";
    public DateTimeOffset? PublishedAt { get; set; }
    public int Attempts { get; set; }
}
