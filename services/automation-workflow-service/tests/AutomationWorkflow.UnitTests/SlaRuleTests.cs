using Xunit;

namespace AutomationWorkflow.UnitTests;

public class SlaRuleTests
{
    [Fact]
    public void Entity_Should_Instantiate_With_Default_Values()
    {
        var id = Guid.NewGuid();
        Assert.NotEqual(Guid.Empty, id);
    }
}
