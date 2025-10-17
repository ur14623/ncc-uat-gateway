import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function Profile() {
  const deviceInfo = {
    basic: {
      name: 'D_3001000001',
      description: 'Test Device',
      active: false
    },
    identifiers: [
      { type: 'IMSI', value: '999993001000001' },
      { type: 'E164', value: '3001000001' }
    ],
    configuration: {
      timeZone: 'N/A',
      dayLightSaving: false,
      securityDomain: 'N/A',
      deviceType: 'NORMAL',
      allowOverage: false,
      syNchfOcsEnabled: false,
      syOcsRealm: 'mnc02.mcc636.3gppnetwork.org',
      syOcsHost: 'ig1.mnc02.mcc636.3gppnetwork.org'
    },
    associations: {
      notificationProfile: 'PRE_DEVICE_NP',
      subscriptionIndex: 'Device_First',
      aggregateView: 'N/A',
      owner: 'U_3001000001',
      language: 'ENGLISH',
      managedElement: 'ig1'
    },
    lifecycle: {
      entityName: 'PRE_DEVICE_ELC_V3',
      entityState: 'ACTIVE',
      entityStateValidityTime: 'Jul 13, 2026 2:52 PM'
    },
    customData: [
      { key: 'DATAOOBFLAG', value: 'TRUE', type: 'String' },
      { key: 'DEVICEACTDATE', value: '8/18/2025 20:50:15.039', type: 'DateTime' },
      { key: 'RECHARGE_OPTIONS', value: 'FALSE', type: 'String' },
      { key: 'SUBSCRIBERTYPE', value: 'CBUPOSTPAID', type: 'String' },
      { key: 'PRIMARYACCOUNTID', value: 'A_10434083', type: 'String' }
    ]
  };

  const accountInfo = {
    basic: {
      accountId: 'A_3001000001',
      accountType: 'Prepaid',
      distributionType: 'Local',
      securityDomain: 'N/A'
    },
    timezone: {
      timezoneId: 'Africa/Addis_Ababa'
    },
    billingCycle: {
      hourOfDay: 0,
      dayOfMonth: 31,
      dayOfWeek: 'SUNDAY',
      billCycleCalendar: 'N/A'
    },
    overage: {
      overageLimit: '€0',
      originalOverageLimit: 'N/A',
      startTime: 'Oct 16, 2025 2:58 PM EAT',
      endTime: 'Oct 16, 2026 12:00 AM EAT'
    },
    associations: {
      taxationProfile: 'N/A',
      chargeTax: 'On top of the fee',
      managedElement: 'ig1'
    },
    lifecycle: {
      entityName: 'PRE_ACCOUNT_ELC_V3',
      entityState: 'ACTIVE',
      entityStateValidityTime: 'Jul 13, 2026 2:52 PM EAT',
      periodName: 'PRE_ACCOUNT_PLC_V3',
      periodState: 'ACTIVE'
    },
    customData: [
      { key: 'HYBRID', value: 'FALSE', type: 'String' },
      { key: 'ELIGIBLE_FOR_TRANSFER', value: 'TRUE', type: 'String' }
    ]
  };

  const userInfo = {
    basic: {
      userId: 'U_3001000001',
      securityDomain: 'N/A',
      distributionType: 'Local',
      firstName: 'UserName_LT_3001000001',
      lastName: 'N/A',
      facebookId: 'N/A',
      emailId: 'LT_3001000001@gmail.com'
    },
    associations: {
      notificationProfile: 'PRE_USER_NP',
      managedElement: 'ig1',
      devices: ['D_3001000001']
    },
    lifecycle: {
      entityName: 'PRE_USER_ELC',
      entityState: 'ACTIVE',
      entityStateValidityTime: 'N/A'
    }
  };

  const groupInfo = {
    groupId: 'G_3001000001',
    groupName: 'Premium Users',
    members: '25 users',
    managedElement: 'ig1',
    lifecycle: 'Active'
  };

  const BooleanIndicator = ({ value }: { value: boolean }) => (
    value ? <CheckCircle2 className="h-4 w-4 text-primary inline" /> : <XCircle className="h-4 w-4 text-muted-foreground inline" />
  );

  const InfoRow = ({ label, value }: { label: string; value: string | boolean | number }) => (
    <div className="grid grid-cols-2 gap-4 py-2 border-b border-border last:border-0">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <span className="text-sm text-muted-foreground">
        {typeof value === 'boolean' ? <BooleanIndicator value={value} /> : value}
      </span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile Information</h1>
        <p className="text-muted-foreground mt-2">Detailed profile information across all sections</p>
      </div>

      <Accordion type="multiple" className="space-y-4">
        {/* Device Info Section */}
        <AccordionItem value="device" className="border border-border bg-card">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
            <CardTitle className="text-lg">Device Info</CardTitle>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <Accordion type="multiple" className="space-y-2">
              <AccordionItem value="device-basic" className="border-0">
                <AccordionTrigger className="text-sm font-semibold py-2">Basic Details</AccordionTrigger>
                <AccordionContent>
                  <InfoRow label="Name" value={deviceInfo.basic.name} />
                  <InfoRow label="Description" value={deviceInfo.basic.description} />
                  <InfoRow label="Active" value={deviceInfo.basic.active} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="device-identifiers" className="border-0">
                <AccordionTrigger className="text-sm font-semibold py-2">Identifiers</AccordionTrigger>
                <AccordionContent>
                  {deviceInfo.identifiers.map((id, idx) => (
                    <div key={idx}>
                      <InfoRow label="Identifier Type" value={id.type} />
                      <InfoRow label="Identifier" value={id.value} />
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="device-config" className="border-0">
                <AccordionTrigger className="text-sm font-semibold py-2">Configuration</AccordionTrigger>
                <AccordionContent>
                  <InfoRow label="Time Zone" value={deviceInfo.configuration.timeZone} />
                  <InfoRow label="Day Light Saving" value={deviceInfo.configuration.dayLightSaving} />
                  <InfoRow label="Security Domain" value={deviceInfo.configuration.securityDomain} />
                  <InfoRow label="Device Type" value={deviceInfo.configuration.deviceType} />
                  <InfoRow label="Allow Overage" value={deviceInfo.configuration.allowOverage} />
                  <InfoRow label="Sy/Nchf OCS Enabled" value={deviceInfo.configuration.syNchfOcsEnabled} />
                  <InfoRow label="Sy OCS Realm" value={deviceInfo.configuration.syOcsRealm} />
                  <InfoRow label="Sy OCS Host" value={deviceInfo.configuration.syOcsHost} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="device-associations" className="border-0">
                <AccordionTrigger className="text-sm font-semibold py-2">Associations</AccordionTrigger>
                <AccordionContent>
                  <InfoRow label="Notification Profile" value={deviceInfo.associations.notificationProfile} />
                  <InfoRow label="Subscription Index" value={deviceInfo.associations.subscriptionIndex} />
                  <InfoRow label="Aggregate View" value={deviceInfo.associations.aggregateView} />
                  <InfoRow label="Owner" value={deviceInfo.associations.owner} />
                  <InfoRow label="Language" value={deviceInfo.associations.language} />
                  <InfoRow label="Managed Element" value={deviceInfo.associations.managedElement} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="device-lifecycle" className="border-0">
                <AccordionTrigger className="text-sm font-semibold py-2">Lifecycle</AccordionTrigger>
                <AccordionContent>
                  <InfoRow label="Entity Name" value={deviceInfo.lifecycle.entityName} />
                  <InfoRow label="Entity State" value={deviceInfo.lifecycle.entityState} />
                  <InfoRow label="Entity State Validity Time" value={deviceInfo.lifecycle.entityStateValidityTime} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="device-custom" className="border-0">
                <AccordionTrigger className="text-sm font-semibold py-2">Custom Data</AccordionTrigger>
                <AccordionContent>
                  {deviceInfo.customData.map((data, idx) => (
                    <div key={idx} className="py-2 border-b border-border last:border-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">{data.key}</span>
                        <Badge variant="outline" className="text-xs">{data.type}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{data.value}</span>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        {/* Account Info Section */}
        <AccordionItem value="account" className="border border-border bg-card">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
            <CardTitle className="text-lg">Account Info</CardTitle>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <Accordion type="multiple" className="space-y-2">
              <AccordionItem value="account-basic" className="border-0">
                <AccordionTrigger className="text-sm font-semibold py-2">Basic Details</AccordionTrigger>
                <AccordionContent>
                  <InfoRow label="Account ID" value={accountInfo.basic.accountId} />
                  <InfoRow label="Account Type" value={accountInfo.basic.accountType} />
                  <InfoRow label="Distribution Type" value={accountInfo.basic.distributionType} />
                  <InfoRow label="Security Domain" value={accountInfo.basic.securityDomain} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="account-timezone" className="border-0">
                <AccordionTrigger className="text-sm font-semibold py-2">Timezone Information</AccordionTrigger>
                <AccordionContent>
                  <InfoRow label="TimeZone ID" value={accountInfo.timezone.timezoneId} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="account-billing" className="border-0">
                <AccordionTrigger className="text-sm font-semibold py-2">Billing Cycle Info</AccordionTrigger>
                <AccordionContent>
                  <InfoRow label="Hour of Day" value={accountInfo.billingCycle.hourOfDay} />
                  <InfoRow label="Day of Month" value={accountInfo.billingCycle.dayOfMonth} />
                  <InfoRow label="Day of Week" value={accountInfo.billingCycle.dayOfWeek} />
                  <InfoRow label="Bill Cycle Calendar" value={accountInfo.billingCycle.billCycleCalendar} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="account-overage" className="border-0">
                <AccordionTrigger className="text-sm font-semibold py-2">Overage</AccordionTrigger>
                <AccordionContent>
                  <InfoRow label="Overage Limit" value={accountInfo.overage.overageLimit} />
                  <InfoRow label="Original Overage Limit" value={accountInfo.overage.originalOverageLimit} />
                  <InfoRow label="Start Time" value={accountInfo.overage.startTime} />
                  <InfoRow label="End Time" value={accountInfo.overage.endTime} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="account-associations" className="border-0">
                <AccordionTrigger className="text-sm font-semibold py-2">Associations</AccordionTrigger>
                <AccordionContent>
                  <InfoRow label="Taxation Profile" value={accountInfo.associations.taxationProfile} />
                  <InfoRow label="Charge Tax" value={accountInfo.associations.chargeTax} />
                  <InfoRow label="Managed Element" value={accountInfo.associations.managedElement} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="account-lifecycle" className="border-0">
                <AccordionTrigger className="text-sm font-semibold py-2">Lifecycle</AccordionTrigger>
                <AccordionContent>
                  <InfoRow label="Entity Name" value={accountInfo.lifecycle.entityName} />
                  <InfoRow label="Entity State" value={accountInfo.lifecycle.entityState} />
                  <InfoRow label="Entity State Validity Time" value={accountInfo.lifecycle.entityStateValidityTime} />
                  <InfoRow label="Period Name" value={accountInfo.lifecycle.periodName} />
                  <InfoRow label="Period State" value={accountInfo.lifecycle.periodState} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="account-custom" className="border-0">
                <AccordionTrigger className="text-sm font-semibold py-2">Custom Data</AccordionTrigger>
                <AccordionContent>
                  {accountInfo.customData.map((data, idx) => (
                    <div key={idx} className="py-2 border-b border-border last:border-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">{data.key}</span>
                        <Badge variant="outline" className="text-xs">{data.type}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{data.value}</span>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        {/* User Info Section */}
        <AccordionItem value="user" className="border border-border bg-card">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
            <CardTitle className="text-lg">User Info</CardTitle>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <Accordion type="multiple" className="space-y-2">
              <AccordionItem value="user-basic" className="border-0">
                <AccordionTrigger className="text-sm font-semibold py-2">Basic Details</AccordionTrigger>
                <AccordionContent>
                  <InfoRow label="User ID" value={userInfo.basic.userId} />
                  <InfoRow label="Security Domain" value={userInfo.basic.securityDomain} />
                  <InfoRow label="Distribution Type" value={userInfo.basic.distributionType} />
                  <InfoRow label="First Name" value={userInfo.basic.firstName} />
                  <InfoRow label="Last Name" value={userInfo.basic.lastName} />
                  <InfoRow label="Facebook ID" value={userInfo.basic.facebookId} />
                  <InfoRow label="Email ID" value={userInfo.basic.emailId} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="user-associations" className="border-0">
                <AccordionTrigger className="text-sm font-semibold py-2">Associations</AccordionTrigger>
                <AccordionContent>
                  <InfoRow label="Notification Profile" value={userInfo.associations.notificationProfile} />
                  <InfoRow label="Managed Element" value={userInfo.associations.managedElement} />
                  <div className="grid grid-cols-2 gap-4 py-2">
                    <span className="text-sm font-semibold text-foreground">Devices</span>
                    <div className="flex flex-wrap gap-2">
                      {userInfo.associations.devices.map((device, idx) => (
                        <Badge key={idx} variant="secondary">{device}</Badge>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="user-lifecycle" className="border-0">
                <AccordionTrigger className="text-sm font-semibold py-2">Lifecycle</AccordionTrigger>
                <AccordionContent>
                  <InfoRow label="Entity Name" value={userInfo.lifecycle.entityName} />
                  <InfoRow label="Entity State" value={userInfo.lifecycle.entityState} />
                  <InfoRow label="Entity State Validity Time" value={userInfo.lifecycle.entityStateValidityTime} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        {/* Group Info Section */}
        <AccordionItem value="group" className="border border-border bg-card">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
            <CardTitle className="text-lg">Group Info</CardTitle>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <InfoRow label="Group ID" value={groupInfo.groupId} />
            <InfoRow label="Group Name" value={groupInfo.groupName} />
            <InfoRow label="Members" value={groupInfo.members} />
            <InfoRow label="Managed Element" value={groupInfo.managedElement} />
            <InfoRow label="Lifecycle" value={groupInfo.lifecycle} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
