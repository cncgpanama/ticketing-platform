"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { COUNTRIES, INDUSTRIES, ORG_TYPES } from "./constants";
import type { AttendeeData, BuyerData } from "./types";

interface AttendeeDetailsStepProps {
  dictionary: Dictionary["registration"]["attendee"];
  buyer: BuyerData;
  onBuyerChange: (data: BuyerData) => void;
  attendees: AttendeeData[];
  onAttendeeChange: (index: number, data: AttendeeData) => void;
  ticketLabels: string[];
}

export function AttendeeDetailsStep({
  dictionary,
  buyer,
  onBuyerChange,
  attendees,
  onAttendeeChange,
  ticketLabels,
}: AttendeeDetailsStepProps) {
  function updateBuyer(field: keyof BuyerData, value: string) {
    onBuyerChange({ ...buyer, [field]: value });
  }

  const [expandedAttendees, setExpandedAttendees] = useState<number[]>(() =>
    attendees.length > 0 ? [0] : [],
  );

  useEffect(() => {
    setExpandedAttendees((prev) => {
      const validIndexes = prev.filter((i) => i < attendees.length);
      if (attendees.length === 0) return [];
      if (validIndexes.length > 0) return validIndexes;
      return [0];
    });
  }, [attendees.length]);

  function toggleAttendee(index: number) {
    setExpandedAttendees((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-bold text-foreground">
          {dictionary.buyerDetailsTitle}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {dictionary.buyerDetailsDescription}
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="buyer-full-name"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              {dictionary.fullName}
            </label>
            <Input
              id="buyer-full-name"
              value={buyer.fullName}
              onChange={(e) => updateBuyer("fullName", e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="buyer-email"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              {dictionary.email}
            </label>
            <Input
              id="buyer-email"
              type="email"
              value={buyer.email}
              onChange={(e) => updateBuyer("email", e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="buyer-phone"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              {dictionary.phoneOptional}
            </label>
            <Input
              id="buyer-phone"
              value={buyer.phone}
              onChange={(e) => updateBuyer("phone", e.target.value)}
            />
          </div>
        </div>
      </div>

      {attendees.map((attendee, index) => {
        const attendeeNumber = index + 1;
        const ticketLabel =
          ticketLabels[index] ?? `${dictionary.ticketLabelFallback} ${attendeeNumber}`;
        const isExpanded = expandedAttendees.includes(index);

        function updateAttendee(
          field: keyof AttendeeData,
          value: string | boolean,
        ) {
          onAttendeeChange(index, { ...attendee, [field]: value });
        }

        return (
          <div
            key={`${ticketLabel}-${attendeeNumber}`}
            className="rounded-lg border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">
                {ticketLabel}
                {" ("}
                {attendeeNumber}
                {dictionary.attendeeOfSeparator}
                {attendees.length}
                {")"}
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={() => toggleAttendee(index)}
                aria-expanded={isExpanded}
                aria-label={
                  isExpanded
                    ? dictionary.collapseAttendee
                    : dictionary.expandAttendee
                }
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            {isExpanded && (
              <div className="mt-6 flex flex-col gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`att-first-name-${index}`}
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      {dictionary.firstName}
                    </label>
                    <Input
                      id={`att-first-name-${index}`}
                      value={attendee.firstName}
                      onChange={(e) =>
                        updateAttendee("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`att-last-name-${index}`}
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      {dictionary.lastName}
                    </label>
                    <Input
                      id={`att-last-name-${index}`}
                      value={attendee.lastName}
                      onChange={(e) =>
                        updateAttendee("lastName", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`att-email-${index}`}
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {dictionary.email}
                  </label>
                  <Input
                    id={`att-email-${index}`}
                    type="email"
                    value={attendee.email}
                    onChange={(e) => updateAttendee("email", e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    {dictionary.country}
                  </label>
                  <Select
                    value={attendee.country}
                    onValueChange={(v) => updateAttendee("country", v)}
                  >
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder={dictionary.selectCountry} />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor={`att-job-${index}`}
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {dictionary.jobTitle}
                  </label>
                  <Input
                    id={`att-job-${index}`}
                    value={attendee.jobTitle}
                    onChange={(e) => updateAttendee("jobTitle", e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor={`att-company-${index}`}
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {dictionary.company}
                  </label>
                  <Input
                    id={`att-company-${index}`}
                    value={attendee.companyName}
                    onChange={(e) =>
                      updateAttendee("companyName", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor={`att-company-url-${index}`}
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {dictionary.companyUrl}
                  </label>
                  <Input
                    id={`att-company-url-${index}`}
                    value={attendee.companyUrl}
                    onChange={(e) =>
                      updateAttendee("companyUrl", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor={`att-work-address-${index}`}
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {dictionary.workAddress}
                  </label>
                  <Input
                    id={`att-work-address-${index}`}
                    value={attendee.workAddress}
                    onChange={(e) =>
                      updateAttendee("workAddress", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor={`att-work-phone-${index}`}
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {dictionary.workPhone}
                  </label>
                  <Input
                    id={`att-work-phone-${index}`}
                    value={attendee.workPhone}
                    onChange={(e) =>
                      updateAttendee("workPhone", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor={`att-emergency-contact-${index}`}
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {dictionary.emergencyContact}
                  </label>
                  <Input
                    id={`att-emergency-contact-${index}`}
                    value={attendee.emergencyContact}
                    onChange={(e) =>
                      updateAttendee("emergencyContact", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor={`att-github-${index}`}
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {dictionary.githubHandle}
                  </label>
                  <Input
                    id={`att-github-${index}`}
                    value={attendee.githubHandle}
                    onChange={(e) =>
                      updateAttendee("githubHandle", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    {dictionary.industry}
                  </label>
                  <Select
                    value={attendee.industry}
                    onValueChange={(v) => updateAttendee("industry", v)}
                  >
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder={dictionary.select} />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map((i) => (
                        <SelectItem key={i} value={i}>
                          {i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor={`att-org-represents-${index}`}
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {dictionary.organizationRepresents}
                  </label>
                  <Input
                    id={`att-org-represents-${index}`}
                    value={attendee.organizationRepresents}
                    onChange={(e) =>
                      updateAttendee("organizationRepresents", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    {dictionary.organizationType}
                  </label>
                  <Select
                    value={attendee.organizationType}
                    onValueChange={(v) => updateAttendee("organizationType", v)}
                  >
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder={dictionary.select} />
                    </SelectTrigger>
                    <SelectContent>
                      {ORG_TYPES.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor={`att-primary-role-${index}`}
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {dictionary.primaryRole}
                  </label>
                  <Input
                    id={`att-primary-role-${index}`}
                    value={attendee.primaryRole}
                    onChange={(e) =>
                      updateAttendee("primaryRole", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    {dictionary.firstKcd}
                  </label>
                  <Select
                    value={attendee.firstTimeKcd}
                    onValueChange={(v) => updateAttendee("firstTimeKcd", v)}
                  >
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder={dictionary.select} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">{dictionary.yes}</SelectItem>
                      <SelectItem value="no">{dictionary.no}</SelectItem>
                      <SelectItem value="skip">
                        {dictionary.preferNotToSay}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor={`att-shirt-size-${index}`}
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {dictionary.shirtSize}
                  </label>
                  <Input
                    id={`att-shirt-size-${index}`}
                    value={attendee.shirtSize}
                    onChange={(e) =>
                      updateAttendee("shirtSize", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor={`att-dietary-needs-${index}`}
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {dictionary.dietaryNeeds}
                  </label>
                  <Input
                    id={`att-dietary-needs-${index}`}
                    value={attendee.dietaryNeeds}
                    onChange={(e) =>
                      updateAttendee("dietaryNeeds", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    {dictionary.disabilityAccommodation}
                  </label>
                  <Select
                    value={attendee.disabilityAccommodation}
                    onValueChange={(v) =>
                      updateAttendee("disabilityAccommodation", v)
                    }
                  >
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder={dictionary.select} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">{dictionary.yes}</SelectItem>
                      <SelectItem value="no">{dictionary.no}</SelectItem>
                      <SelectItem value="skip">
                        {dictionary.preferNotToSay}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor={`att-person-of-color-${index}`}
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {dictionary.personOfColor}
                  </label>
                  <Input
                    id={`att-person-of-color-${index}`}
                    value={attendee.personOfColor}
                    onChange={(e) =>
                      updateAttendee("personOfColor", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor={`att-gender-identity-${index}`}
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {dictionary.genderIdentity}
                  </label>
                  <Input
                    id={`att-gender-identity-${index}`}
                    value={attendee.genderIdentity}
                    onChange={(e) =>
                      updateAttendee("genderIdentity", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor={`att-age-range-${index}`}
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {dictionary.ageRange}
                  </label>
                  <Input
                    id={`att-age-range-${index}`}
                    value={attendee.ageRange}
                    onChange={(e) => updateAttendee("ageRange", e.target.value)}
                  />
                </div>

                <div className="border-t border-border" />

                <div className="flex gap-3">
                  <Checkbox
                    id={`cncf-consent-${index}`}
                    checked={attendee.cncfConsent}
                    onCheckedChange={(c) => updateAttendee("cncfConsent", !!c)}
                    className="mt-0.5 shrink-0"
                  />
                  <label
                    htmlFor={`cncf-consent-${index}`}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="font-semibold text-foreground">
                      {dictionary.cncfCommunicationsTitle}
                    </span>
                    <br />
                    {dictionary.cncfCommunicationsBodyOne}
                    <br />
                    {dictionary.cncfCommunicationsBodyTwo}
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`sponsor-opt-in-${index}`}
                    checked={attendee.sponsorCommunicationsOptIn}
                    onCheckedChange={(c) =>
                      updateAttendee("sponsorCommunicationsOptIn", !!c)
                    }
                  />
                  <label
                    htmlFor={`sponsor-opt-in-${index}`}
                    className="text-sm text-muted-foreground"
                  >
                    {dictionary.whatsappOptIn}
                  </label>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
